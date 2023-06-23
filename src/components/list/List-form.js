import { useRef, useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { Add, Mark } from "../icons/icons";
const ListForm = (props) => {
  const addinputref = useRef(null);
  const [show, setShow] = useState(false);

  const createHanlde = () => {
    setShow(false);
    const inputvalue = addinputref.current?.value;
    if (inputvalue.length > 0 && inputvalue.length < 32) {
      props.CreateHanlder(inputvalue);
    }
  };
  return (
    <>
      {!show && (
        <div key={"add_button_event_item"} className={props.style("addbtn")}>
          <h3 className={props.style("addbtn_name")}>
            {props.nameList && props.nameList()}
          </h3>
          <Button
            classname={props.style("addbtn_btn")}
            onClick={() => setShow(true)}
          >
            <Add /> <>{props.value}</>
          </Button>
        </div>
      )}

      {show && (
        <div key={"add_new_list_item"} className={props.style("add")}>
          <Input
            ref={addinputref}
            placeholder="add new list"
            classname={props.style("add_input")}
          />
          <Button classname={props.style("add_button")} onClick={createHanlde}>
            <Mark />
          </Button>
        </div>
      )}
    </>
  );
};

export default ListForm;
