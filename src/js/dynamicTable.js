import { timeConverter } from "./services/timeFormat.service.js";

export const tableCreator = (
  { id, title, timestamp, description, user_id, state },
  userName
) => {
  const date = timeConverter(timestamp);
  const table = ` <tr class=" position-relative ">
    <th scope="row" class="text-center"> <div class="docked-at-corner__docker" style="background-color: ${state == 0 ? "#e43434a4" : state == 1 ? "#fdb122da" : "#01b801da"} "></div>${id}</th>
    <td class="text-center">${title}</td>
    <td class="text-center">${userName}</td>
    <td class="text-center">${date}</td>
    <td class="text-center">
      <select class="form-select" aria-label="Default select example" data-track-id="modify"  data-id="${id}" >
        <option value="0"  ${state == 0 ? "selected" : ""} >untreated</option>
        <option value="1" ${state == 1 ? "selected" : ""}>In progress</option>
        <option value="2" ${state == 2 ? "selected" : ""}>treaty</option>
      </select>
    </td>
    <td class="text-center">
    <button type="button" class="btn btn-light" data-track-id="delete" data-id="${id}"><i class="bi bi-trash-fill" data-track-id="delete"></i></button></td>
    </tr>`;
  return table;
};
