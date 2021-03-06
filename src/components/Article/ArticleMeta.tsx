import React from "react";

import { Article } from "../../interfaces";

interface Props {
  article: Article;
}

function ArticleMeta({ article }: Props) {
  return (
    <div className="article-meta">
      <a href="/">
        <img src={article.author.image} alt="" />
      </a>
      <div className="info">
        <a href="/" className="author">
          {article.author.username}
        </a>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round"></i>
        &nbsp;
        {article.author.username}
      </button>
      &nbsp;&nbsp;
      <button className="btn btn-sm btn-outline-primary">
        <i className="ion-heart"></i>
        &nbsp; Favorite Post{" "}
        <span className="counter">{article.favoritesCount}</span>
      </button>
    </div>
  );
}

export default ArticleMeta;
