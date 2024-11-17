import React from 'react';
import ArticleComponent from "./ArticleComponent";
import AsideComponent from "./AsideComponent";

const LayoutComponent = () =>{
    return (
        <div className="layout">
            <AsideComponent />

            <ArticleComponent />

        </div>
    )
}

export default LayoutComponent;