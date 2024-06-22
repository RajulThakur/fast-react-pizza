import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
    const menu = useLoaderData();
    return (
        <ul className="divide-y-4 divide-st
         px-2">
            {menu.map((el) => (
                <MenuItem pizza={el} key={el.id} />
            ))}
        </ul>
    );
}
export async function loader() {
    const menu = await getMenu();
    return menu;
}
export default Menu;
