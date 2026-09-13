import type { IProduct } from '../types/product';
import { Button, Flex, Typography } from 'antd';
import { Card } from 'antd';

interface Props {
   data: IProduct;
   addToCart: () => void;
}

const ProductCard = ({ data, addToCart }: Props) => {
   const { title, description, price, thumbnail } = data;

   return (
      <Card
         hoverable
         variant="borderless"
         style={{ width: '100%', height: '485px' }}
         cover={<img draggable={false} style={{ height: '260px' }} alt={title} src={thumbnail} />}>
         <Card.Meta
            title={title}
            description={
               <Flex vertical gap={6}>
                  <Typography.Text>{description.length > 100 ? `${description.slice(0, 100)}...` : description}</Typography.Text>
                  <Typography.Text style={{ fontWeight: 'bold' }}>{price} $</Typography.Text>

                  <Button onClick={addToCart}>Добавить в корзину</Button>
               </Flex>
            }
         />
      </Card>
   );
};

export default ProductCard;
