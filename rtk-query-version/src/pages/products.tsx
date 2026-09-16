import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Flex, Layout, Menu, Spin, theme } from 'antd';
import { Col, Row } from 'antd';
import ProductCard from '../ui/product-card';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../store/cart';
import { useAddProductMutation, useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from '../store/products.api';
import type { IProductInput, IProductUpdate } from '../types/product';

const ProductsPage: React.FC = () => {
   const [collapsed, setCollapsed] = useState(false);
   const {
      token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();

   const dispatch = useAppDispatch();

   // const [trigger, { data: products, isLoading }] = useLazyGetProductsQuery();
   const { data: products, isLoading, refetch } = useGetProductsQuery();
   const [addProduct, { isLoading: isLoadingCreate }] = useAddProductMutation();
   const [updateProduct, { isLoading: isLoadingUpdate }] = useUpdateProductMutation();
   const [deleteProduct, { isLoading: isLoadingDelete }] = useDeleteProductMutation();

   const handleAddProduct = async (newProduct: IProductInput) => {
      try {
         await addProduct(newProduct).unwrap();
      } catch (error) {
         console.log(error);
      }
   };

   const handleUpdateProduct = async (product: IProductUpdate) => {
      try {
         await updateProduct(product).unwrap();
      } catch (error) {
         console.log(error);
      }
   };

   const handleDeleteProduct = async (id: number) => {
      try {
         await deleteProduct(id).unwrap();
      } catch (error) {
         console.log(error);
      }
   };

   // const handleLoadProducts = () => {
   //    trigger();
   // };

   const handleRefetch = () => {
      refetch();
   };

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
               {/* <Flex justify="center" style={{ marginBottom: 16 }}>
                  <Button type="primary" onClick={handleLoadProducts} disabled={isLoading} loading={isLoading}>
                     Загрузить продукты
                  </Button>
               </Flex> */}
               <Flex justify="center" style={{ marginBottom: 16 }}>
                  <Button type="primary" onClick={handleRefetch} disabled={isLoading} loading={isLoading}>
                     Обновить продукты
                  </Button>
               </Flex>
               {isLoading ? (
                  <Flex style={{ width: '100%', height: '100%' }} align="center" justify="center">
                     <Spin size="large" />
                  </Flex>
               ) : (
                  <Row gutter={[16, 16]}>
                     {products?.map(item => {
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
