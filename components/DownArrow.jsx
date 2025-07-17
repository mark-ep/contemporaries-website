import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from 'react';

export const DownArrow = ({ scrollDistance = 200 }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [visible, setVisible] = useState(true);
    const handleScroll = useCallback(
        () => {
            const position = window.pageYOffset;
            setScrollPosition(position);

            if (position > scrollDistance)
                setVisible(false);
        }, [scrollDistance]
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
    const opacity = visible ? 1 - scrollPosition / scrollDistance : 0;
    return (
        <Box
            width="100px"
            height="100px"
            transform="rotate(-45deg) scale(1)"
            color="blackAlpha.600"
            border="20px solid"
            borderTopColor="transparent"
            borderRightColor="transparent"
            borderRadius="0 0 0 20px"
            opacity={opacity} />
    );
};
