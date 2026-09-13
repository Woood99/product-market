import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Flex, Layout, Menu, Spin, theme } from 'antd';
import { Col, Row } from 'antd';
import ProductCard from '../ui/product-card';
import { getProducts, getProductsLoading, loadProductsList } from '../store/products';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addToCart } from '../store/cart';

const ProductsPage: React.FC = () => {
   const [collapsed, setCollapsed] = useState(false);
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   const products = useAppSelector(getProducts);
   const isLoading = useAppSelector(getProductsLoading);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(loadProductsList());
   }, [dispatch]);

   return (
      <Layout style={{ width: '100%', minHeight: '100vh' }}>
         <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
               theme="dark"
               mode="inline"
               defaultSelectedKeys={['1']}
               items={[
                  {
                     key: '1',
                     icon: <UserOutlined />,
                     label: 'nav 1',
                  },
                  {
                     key: '2',
                     icon: <VideoCameraOutlined />,
                     label: 'nav 2',
                  },
                  {
                     key: '3',
                     icon: <UploadOutlined />,
                     label: 'nav 3',
                  },
               ]}
            />
         </Layout.Sider>
         <Layout>
            <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
               <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                     fontSize: '16px',
                     width: 64,
                     height: 64,
                  }}
               />
            </Layout.Header>
            <Layout.Content
               style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
               }}>
               {isLoading ? (
                  <Flex style={{ width: '100%', height: '100%' }} align="center" justify="center">
                     <Spin size="large" />
                  </Flex>
               ) : (
                  <Row gutter={[16, 16]}>
                     {products.map(item => {
                        return (
                           <Col span={6} key={item.id}>
                              <ProductCard data={item} addToCart={() => dispatch(addToCart(item))} />
                           </Col>
                        );
                     })}
                  </Row>
               )}
            </Layout.Content>
         </Layout>
      </Layout>
   );
};

export default ProductsPage;
