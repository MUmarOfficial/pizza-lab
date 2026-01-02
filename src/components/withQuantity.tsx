import type { ComponentType, FC } from "react";
import type { Pizza } from "../data/menu-items"
import type { MenuItemProps } from "./MenuItem";
import { useAppSelector } from "../store/hooks";
import { selectItemQuantity, type CartItem } from "../store/cartSlice";

type WithQuantityProps = {
    item: Pizza;
};

const withQuantity = (
    Component: ComponentType<MenuItemProps>
) => {
    const WithQuantityComponent: FC<WithQuantityProps> = (props) => {
        const { item } = props;
        const quantity = useAppSelector(selectItemQuantity(item));

        const cartItem: CartItem = {
            ...item,
            quantity
        }
        return <Component item={cartItem} />
    };
    return WithQuantityComponent;
};

export default withQuantity;
