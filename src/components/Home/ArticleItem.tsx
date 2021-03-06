import React from "react";
import { Link, generatePath } from "react-router-dom";

import { ROUTES } from "../../constants";
import { Article as ArticleType } from "../../interfaces";

interface Props {
  article: ArticleType;
}

function ArticleItem({ article }: Props) {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href="profile.html">
          <img src={article.author.image} />
        </a>
        <div className="info">
          <a href="" className="author">
            {article.author.username}
          </a>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <Link
        to={generatePath(ROUTES.article, { slug: article.slug })}
        className="preview-link"
      >
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
}

export default ArticleItem;
