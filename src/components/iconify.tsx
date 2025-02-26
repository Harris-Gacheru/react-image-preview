import { Icon, IconifyIcon } from "@iconify/react";
import Box, { BoxProps } from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";

interface Props extends BoxProps {
  sx?: SxProps;
  icon: IconifyIcon | string;
}

const Iconify = ({ icon, sx, ...other }: Props) => {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
};

export default Iconify;
