import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import ArticleComponent from "./Components/ArticleComponent";
import AsideComponent from "./Components/AsideComponent";
import BlogComponent from "./Components/BlogComponent";

const { Header, Content, Footer } = Layout;

function App() {
    const [listState, setListState] = useState([]);
    const [view, setView] = useState("inicio");

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleMenuClick = (e) => {
        switch (e.key) {
            case '1':
                setView("inicio");
                break;
            case '2':
                setView("peliculas");
                break;
            case '3':
                setView("blog");
                break;
            default:
                break;
        }
    };

    const menuItems = [
        { key: '1', label: 'Inicio' },
        { key: '2', label: 'Películas' },
        { key: '3', label: 'Blog' },
        { key: '4', label: 'Contacto' }
    ];

    return (
        <Layout>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', display: 'flex', alignItems: 'center' }}>
                <div style={{ color: '#fff', fontSize: '1.5rem', marginRight: '16px' }}>Películas</div>
                <Menu theme="dark" mode="horizontal" selectedKeys={[view]} items={menuItems} onClick={handleMenuClick} style={{ flex: 1, minWidth: 0 }} />
            </Header>

            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    {view === 'peliculas' && <Breadcrumb.Item>Películas</Breadcrumb.Item>}
                    {view === 'blog' && <Breadcrumb.Item>Blog</Breadcrumb.Item>}
                </Breadcrumb>

                <div style={{ padding: 24, minHeight: 380, background: colorBgContainer, borderRadius: borderRadiusLG }}>
                    {view === "inicio" && (
                        <div className="layout-inicio">
                            <AsideComponent className="aside" setListState={setListState} />
                            <ArticleComponent className="content" listState={listState} setListState={setListState} />
                        </div>
                    )}
                    {view === "peliculas" && (
                        <ArticleComponent listState={listState} setListState={setListState} />
                    )}
                    {view === "blog" && (
                        <BlogComponent />
                    )}
                </div>
            </Content>

            <Footer style={{ textAlign: 'center' }}>
                Máster en JavaScript ES12 y TypeScript
            </Footer>
        </Layout>
    );
}

export default App;
