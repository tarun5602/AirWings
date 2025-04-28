import React from "react";
import * as ReactBi from "react-icons/bi";
import * as ReactIo from "react-icons/io";
import * as ReactTb from "react-icons/tb";
import * as ReactMd from "react-icons/md";

export default function CustomIcon({ iconName }) {
  const IconComponent =
    ReactBi[iconName] ||
    ReactIo[iconName] ||
    ReactTb[iconName] ||
    ReactMd[iconName];

  if (!IconComponent) {
    return <div>Icon not found</div>;
  }

  return <IconComponent size={40}/>;
}
