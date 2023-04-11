import { Autocomplete, Grid, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import fetcher from "@/utils/fetcher";
import API_CATEGORY from "@/assets/api/category";
import { useQueries } from "react-query";
import { IOptions } from "@/types/common";

type categoryType = "large" | "medium" | "small";

interface IProps {
  values?: Array<number | null>;
  isDisabled?: boolean;
  handleCallback: (payload: Array<number | null>, index?: number) => void;
  index?: number;
  categoryType?: categoryType;
  categoryResetState?: boolean;
  setCategoryResetState?: (payload: any) => void;
  xs?: number;
}

interface ICategory {
  categoryType: categoryType;
  label: string;
  upperCategoryNo: number | null;
  options: IOptions[];
}

const CategorysComp: React.FC<IProps> = ({
  values,
  isDisabled = false,
  handleCallback,
  index,
  categoryType,
  xs,
  categoryResetState,
  setCategoryResetState,
}) => {
  // 카테고리 초기화
  const funcInitialCategorys = (categoryType?: categoryType) => {
    const categoryCase: ICategory[] = [
      {
        categoryType: "large",
        label: "카테고리 대분류",
        upperCategoryNo: null,
        options: [],
      },
      {
        categoryType: "medium",
        label: "카테고리 중분류",
        upperCategoryNo: null,
        options: [],
      },
      {
        categoryType: "small",
        label: "카테고리 소분류",
        upperCategoryNo: null,
        options: [],
      },
    ];

    if (categoryType && categoryType === "large") {
      return categoryCase.splice(0, 1);
    } else if (categoryType && categoryType === "medium") {
      return categoryCase.splice(0, 2);
    } else {
      return categoryCase;
    }
  };

  const [categorys, setCategorys] = useState<ICategory[]>(
    funcInitialCategorys(categoryType)
  );

  //데이터 load
  const fetchData = async (options: {
    categoryType: string;
    upperCategoryNo?: number;
  }) =>
    await fetcher({ api: API_CATEGORY.CATEGORY_LIST, options }).then(
      (data) => data.data
    );

  // 현 카테고리에 따라 하위 카테고리 로드
  const getCategorys = useQueries(
    categorys.map(({ categoryType }, i) => {
      const beforeCategory = categorys[i - 1] || categorys[0];
      return {
        queryKey:
          categoryType === "large"
            ? [categoryType]
            : [categoryType, beforeCategory.upperCategoryNo],
        queryFn: () =>
          fetchData({
            categoryType,
            upperCategoryNo: beforeCategory.upperCategoryNo || 0,
          }),
        enabled:
          categoryType === "large" ? true : !!beforeCategory.upperCategoryNo,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      };
    })
  );

  //카테고리 생성
  const renderCategorys = useMemo(() => {
    const newCategorys = categorys.map((item, i) => {
      const res = getCategorys[i];
      if (res.data && res.data.data.length > 0) {
        const options: IOptions[] = (getCategorys[i].data.data || []).map(
          ({
            categoryLargeName,
            categoryLargeNo,
            categoryMediumName,
            categoryMediumNo,
            categorySmallName,
            categorySmallNo,
          }: {
            categoryLargeName: string;
            categoryLargeNo: number;
            categoryMediumName: string;
            categoryMediumNo: number;
            categorySmallName: string;
            categorySmallNo: number;
          }) => {
            if (item.categoryType === "large") {
              return { label: categoryLargeName, value: categoryLargeNo };
            } else if (item.categoryType === "medium") {
              return { label: categoryMediumName, value: categoryMediumNo };
            } else if (item.categoryType === "small") {
              return { label: categorySmallName, value: categorySmallNo };
            }
          }
        );
        return {
          ...item,
          options,
        };
      }
      return item;
    });
    return newCategorys.filter(({ options }) => options.length > 0);
  }, [getCategorys]);

  //카테고리 변경시?
  useEffect(() => {
    if (values) {
      setCategorys(
        categorys.map((item, i) => {
          return {
            ...item,
            upperCategoryNo: values[i] || null,
          };
        })
      );
    }
  }, [values]);

  //카테고리 리셋이 true일때 초기값으로 초기화 후 상태 원복
  useEffect(() => {
    if (categoryResetState && setCategoryResetState) {
      setCategorys(funcInitialCategorys(categoryType));
      setCategoryResetState(false);
    }
  }, [categoryResetState]);

  return (
    <Grid container spacing={2} rowSpacing={2}>
      {renderCategorys.map(
        ({ categoryType, label, upperCategoryNo, options }, i) => {
          const optionsFilter = [{ label: "선택", value: "" }, ...options];
          return (
            <Grid key={i} item xs={xs || 4}>
              <Autocomplete
                options={optionsFilter}
                getOptionLabel={(option) => option.label}
                value={
                  optionsFilter.find(
                    (opt) => String(opt.value) === String(upperCategoryNo)
                  ) || optionsFilter[0]
                }
                onChange={(_, newValue) => {
                  const newCategorys = categorys.map((item, ii) => {
                    if (categoryType === item.categoryType) {
                      return {
                        ...item,
                        upperCategoryNo: Number(newValue?.value),
                      };
                    }
                    return {
                      ...item,
                      upperCategoryNo: i < ii ? null : item.upperCategoryNo,
                    };
                  });
                  setCategorys(newCategorys);
                  if (index) {
                    handleCallback(
                      newCategorys.map(
                        ({ upperCategoryNo }) => upperCategoryNo
                      ),
                      index
                    );
                  } else {
                    handleCallback(
                      newCategorys.map(({ upperCategoryNo }) => upperCategoryNo)
                    );
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label={label} />
                )}
                size="small"
                disableClearable
                disabled={isDisabled}
              />
            </Grid>
          );
        }
      )}
    </Grid>
  );
};

export default CategorysComp;
