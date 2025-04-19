import { DataGrid, GridColDef } from "@mui/x-data-grid";

import type { ItemSourceSearch } from "@/types/meta";

type PropsType = {
  data: ItemSourceSearch[];
};

export function ItemSourceGrid(props: PropsType) {
  const { data } = props;

  const columns: GridColDef<ItemSourceSearch>[] = [
    { field: "item_name", headerName: "Item", flex: 2 },
    { field: "module_code", headerName: "Module code", flex: 1 },
    { field: "module_name", headerName: "Module name", flex: 2 },
  ];

  return (
    <DataGrid
      rows={data}
      columns={columns}
      density="compact"
      getRowId={(r) => r.module_code}
    />
  );
}

export default ItemSourceGrid;
