import css from "./../../assets/Lists.module.scss";
import { Add, Close } from "../../components/icons/icons";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { addList } from "./listSlice";
const ListFrom = ({ form, ...props }) => {
  const [value, setValue] = useState("");
  const auth = useAuth();
  const dispatch = useDispatch();
  const addNewListHandle = () => {
    if (value.length === 0) return form.showForm(false);
    const payload = {
      auth,
      body: {
        name: value,
      },
    };
    dispatch(addList(payload));
    setValue("");
    form.showForm(false);
  };
  return (
    <div className={form.form ? `${css.form} ${css.form_active}` : css.form}>
      {/* <div className={css.form_btn}>
        <Add />
      </div> */}
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        classname={css.form_input}
        placeholder="New List"
      />
      <Button
        classname={
          value?.length > 0
            ? `${css.form_button} ${css.form_button_active}`
            : css.form_button
        }
        onClick={addNewListHandle}
      >
        {value?.trim()?.length > 0 ? <Add /> : <Close />}
      </Button>
    </div>
  );
};

export default ListFrom;
