import { RootState } from "@/store/configureStore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface IProps {
  initialButtons?: IMenuButton[];
}

interface IMenuButton {
  buttonId: string;
  buttonDesc?: string;
  fieldProps?: { [key: string]: any };
}

/**
 * @category Custom Hooks
 * @description 화면별 권한 버튼을 가져오는 hooks
 */
const useGetMenuButtons = function ({ initialButtons }: IProps = {}) {
  const [settingButtons, setSettingButtons] = useState<IMenuButton[]>(
    initialButtons || []
  );
  const [buttons, setButtons] = useState<IMenuButton[]>([]);
  const { currentMenu } = useSelector(
    ({ breadcrumbs }: RootState) => breadcrumbs
  );

  useEffect(() => {
    if (currentMenu && currentMenu.adminMenuButtonList) {
      if (settingButtons) {
        const btns: IMenuButton[] = [];
        currentMenu.adminMenuButtonList.forEach((button) => {
          settingButtons.forEach(({ buttonId, fieldProps }) => {
            if (button.buttonId === buttonId) {
              btns.push({
                fieldProps: fieldProps || { variant: "contained" },
                ...button,
              });
            }
          });
        });

        setButtons(btns);
      }
    }
  }, [currentMenu, settingButtons]);

  return {
    buttons,
    currentMenu,
    setButtons,
    setSettingButtons,
  };
};

export default useGetMenuButtons;
