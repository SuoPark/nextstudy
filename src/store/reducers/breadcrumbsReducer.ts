import { IMenuItem } from "@/hooks/useAdminInfo";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IBreadcrumbsStateType {
  breadCrumbs: IMenuItem[];
  currentMenu: IMenuItem | null;
}

const initialState: IBreadcrumbsStateType = {
  breadCrumbs: [],
  currentMenu: null,
};

const actionTypes = {
  SET_BREAD_CRUMBS: "setBreadCrumbs",
  CLEAR: "clear",
};

/**
 * @category store
 * @subcategory breadcrumbsReducer
 * @description 현재 페이지 정보를 관리하는 store
 */
const slice = createSlice({
  name: "breadcrumbs",
  initialState,
  reducers: {
    [actionTypes.SET_BREAD_CRUMBS](state, { payload: { menuList, pathname } }) {
      const getMenu = (menus: IMenuItem[]): IMenuItem | null => {
        let item: IMenuItem | null = null;
        menus.forEach((menu) => {
          const { menuUrl, children, menuName } = menu;
          if (pathname.includes(menuUrl) || pathname.includes(`/${menuUrl}`)) {
            item = menu;
          } else if (children && children.length > 0) {
            if (getMenu(children)) {
              item = getMenu(children);
            }
          }
        });
        return item;
      };
      if (menuList.children) {
        const currentMenu = getMenu(menuList.children);
        if (currentMenu) {
          const getUpperMenu = ({
            items,
            menus,
          }: {
            items: IMenuItem[];
            menus: IMenuItem[];
          }) => {
            const stack = items;
            const lastItem = stack[stack.length - 1];
            menus.forEach((menu) => {
              const { adminMenuNo, children } = menu;
              if (lastItem.upperMenuNo === adminMenuNo) {
                stack.push(menu);
                getUpperMenu({ items: stack, menus: menuList.children });
              } else if (children && children.length > 0) {
                getUpperMenu({ items: stack, menus: children });
              }
            });
            return stack;
          };
          const breadCrumbs = getUpperMenu({
            items: [currentMenu],
            menus: menuList.children,
          }).reverse();
          state.breadCrumbs = breadCrumbs;
        }
        state.currentMenu = currentMenu;
      }
    },
    [actionTypes.CLEAR](state) {
      state.breadCrumbs = [];
      state.currentMenu = null;
    },
  },
});

export const breadcrumbsActions = slice.actions;
export default slice.reducer;
