import React from "react";
import { Grid, Divider as MuiDivider } from "@material-ui/core";

const DividerText = ({ children, ...props }) => (
  <Grid container alignItems="center" spacing={1} {...props}>
    <Grid item lg>
      <MuiDivider style={{ background: '#fff', height: 0.5 }}/>
    </Grid>
    <Grid item>{children}</Grid>
    <Grid item lg>
      <MuiDivider style={{ background: '#fff', height: 0.5 }}/>
    </Grid>
  </Grid>
);

export default DividerText;
