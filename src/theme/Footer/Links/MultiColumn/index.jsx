import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import MultiColumn from "@theme-original/Footer/Links/MultiColumn";

export default function FooterLinks(props) {
  const face = useBaseUrl("/img/mascot/pine-icon.png");
  const columns = props.columns.map((column) =>
    column.title === "Pine"
      ? {
          ...column,
          title: (
            <Link
              to="/"
              className="navbar__brand pine-footer-brand"
              aria-label="Pine homepage"
            >
              <div className="navbar__logo">
                <img src={face} alt="" width="34" height="34" />
              </div>
              <b className="navbar__title text--truncate">pine</b>
            </Link>
          ),
        }
      : column,
  );
  return <MultiColumn {...props} columns={columns} />;
}
