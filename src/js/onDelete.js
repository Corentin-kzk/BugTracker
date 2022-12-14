import { getDeleteBug } from "./services/getUserData.service.js";
export const onDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this?")) {
    const res = await getDeleteBug(id); 
    if (res.result.status == "done") {
      location.reload();
    }
  } else return;
};
