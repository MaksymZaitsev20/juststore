import { MenuItem, MenuList } from "@mui/material";
import { FC } from "react";
import { useGetAllCategoriesQuery } from "../api/categoryApi";

interface IProps {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const SideBar: FC<IProps> = ({ setCategory }) => {
  const { data: categories = [] } = useGetAllCategoriesQuery();

  return (
    <MenuList sx={{ boxShadow: "rgba(99,99,99,0.2) 0 2px 8px 5px" }}>
      <MenuItem
        onClick={() => {
          setCategory("all");
        }}
      >
        All
      </MenuItem>
      {categories.map((category, index) => {
        return (
          <MenuItem
            onClick={() => {
              setCategory(category);
            }}
            key={index}
          >
            {category[0].toUpperCase() + category.slice(1)}
          </MenuItem>
        );
      })}
    </MenuList>
  );
};

export default SideBar;
