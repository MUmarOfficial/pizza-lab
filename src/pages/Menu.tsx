import MenuItem from "../components/MenuItem";
import withQuantity from "../components/withQuantity";
import { MENU_ITEMS } from "../data/menu-items";

const QuantifiedMenuItem = withQuantity(MenuItem);

const Menu = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-12">
      <h2 className="pageTitle">
        Pick what you crave
      </h2>
      {/* Grid: 1 col on mobile, 1 col on tablet (wide cards), possibly 2 on huge screens if desired, but 1 col stacks nicely with the new card design */}
      <ul className="grid grid-cols-1 gap-6">
        {MENU_ITEMS.map((item) => {
          return <QuantifiedMenuItem key={item.id} item={item} />;
        })}
      </ul>
    </div>
  );
};

export default Menu;