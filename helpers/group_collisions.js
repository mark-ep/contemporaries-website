import { spread } from "./spread";

export const pointsMatch = (a, b, tolerance = 0.01) =>
  // check if two points are the same (within specified tolerance)
  Math.hypot(a[0] - b[0], a[1] - b[1]) < tolerance;

export const insertToGroup = (groups, groupIndex, item) =>
  // return a copy of a set of grouped items with the provided item
  // inserted into the specified group
  groups.map((group, i) => i === groupIndex ? [...group, item] : group)

export const groupCollisions = (people, tolerance = 0.01) => {
  return people.slice(1).reduce(
    (groups, person) => {
      // find group which collides with this person
      const groupIndex = groups.findIndex(
        group => group.some(other => pointsMatch(other.location, person.location, tolerance))
      );
      // add them to that group if it exists
      if (groupIndex > 0)
        return insertToGroup(groups, groupIndex, person)
      // otherwise start a new group
      return [...groups, [person]]
    },
    [[people[0]]] // start with a group containing the 0th person
  )
}

export const spreadCollisions = (people, tolerance = 0.01, radius = 0.1) => {
  /*
   * looks for cases in a list of people in which two (or more) people are
   * at the same location on the map.
   * 
   * This would cause a crash when trying to draw the connection line between them
   * (plus would be impossible to see that they're both there) so instead we move
   * their markers away from each other
   */

  // first check if there are actually enough people (2 or more),
  // otherwise we don't need to do anything
  if (!people || people.length < 2) {
    return people
  }

  // create a set of 'groups' - sets of people that have the same location
  const groups = groupCollisions(people, tolerance);

  // create `spreadGroups` - a copy of 'groups' in which each group of more than
  // one person has had their locations spread out
  const spreadGroups = groups.map(
    group => {
      const n_points = group.length;

      // if there's just one person we don't need to do anything
      if (n_points === 1)
        return group;

      // find centre position of group
      const cx = group.reduce((mean, person) => mean + person.location[0] / n_points, 0);
      const cy = group.reduce((mean, person) => mean + person.location[1] / n_points, 0);
      const centre = [cx, cy]

      // spread points around centre
      const newPoints = spread(centre, n_points, radius);

      // assign the new locations to the people
      return group.map(
        (person, i) => {
          return {
            ...person,
            location: newPoints[i]
          }
        }
      )
    });

  // compress the groups back into a simple list of people
  return spreadGroups.reduce(
    (arr, group) => [...arr, ...group], []
  );
} 