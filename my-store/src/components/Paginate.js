import React from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ page, pages, keyword = "", isAdmin = false }) {
  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }
  
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={{
              pathname:isAdmin ? `/admin/productlist/` : `/`,
              search: `?keyword=${keyword}&page=${x + 1}`,
            }}
          >
            <Pagination.Item key={x + 1} disabled={x + 1 === page}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
