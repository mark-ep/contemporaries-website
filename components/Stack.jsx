import { Box, Grid } from "@chakra-ui/react"

export const Stack = ({ image, children, alt = "background image", ...props }) => (
  <Grid
    templateAreas={`"stack"`}
    overflow="hidden"
    color="white"
    {...props}
    sx={{
      ".stack__background-image": {
        gridArea: "stack",
        filter: "brightness(0.45) saturate(1.25)",
        display: "block",
        objectFit: "cover",
        width: "100%",
        height: "100%",
        position: "fixed"
      }
    }}
  >
    <img
      className="stack__background-image"
      src={image}
      alt={alt}
    />
    <Box
      gridArea="stack"
      position="relative"
      alignSelf="flex-start"
      h="full"
    >
      {children}
    </Box>
  </Grid>
);

export default Stack;