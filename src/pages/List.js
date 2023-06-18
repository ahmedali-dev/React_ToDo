import React, { useState, useRef, useEffect } from "react";
import List_Side from "./../components/list/List-side";
import List_Item from './../components/list/List-item'
import { useParams } from "react-router-dom";
import css from './assets/Lists.module.scss';
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { Add, Mark } from "../components/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { FetchData } from "../hooks/thunk";
import { useContext } from "react";
import AuthContext from "../Store/Auth-context";
import { addTask, fetchLists } from "../Store/slices/ListSlice";
import { toast } from "react-hot-toast";

const classname = 'lContainer_';
const listcss = (Class) => css[classname + Class]
const List = ({ ...props }) => {


    const inputEdit = useRef(null);
    const addinputref = useRef(null)
    const [showAdd, setshowAdd] = useState(false);
    const params = useParams();
    const container = (Class) => css[`lContainer_${Class}`];

    const auth = useContext(AuthContext);

    // _____________________________
    // toolkit code
    // _____________________________


    const { data, error, loading } = useSelector(state => state.List);
    const dispatch = useDispatch();
    //fetch lists from api
    useEffect(() => {

        if (data.length == 0) {

            (async () => {
                try {
                    const req = await FetchData('/lists', {}, {}, auth)

                    dispatch(fetchLists({ data: req.data }))


                } catch (error) {
                    console.log(error)
                    auth.logout();
                }

            })();
        }
    }, []);


    const createNewTask = () => {
        setshowAdd(false);
        const inputvalue = addinputref.current?.value;
        if (inputvalue.length >= 3 && inputvalue.length < 32) {
            console.log('start')
            const payload = { body: { task: inputvalue, idTask: params.id }, auth }
            dispatch(addTask(payload));
        }
    }
    // _____________________________
    // _____________________________

    const addbtn = <div key={'add_button_event_item'} className={listcss('addbtn')}>
        <Button classname={listcss('addbtn_btn')} onClick={() => setshowAdd(true)}>
            <Add /> <span>Add new <strong>task</strong></span>
        </Button>
    </div>;

    const addComp = <div key={'add_new_list_item'} className={listcss('add')}>
        <Input ref={addinputref} placeholder='add new list' classname={listcss('add_input')} />
        <Button classname={listcss('add_button')} onClick={createNewTask}>
            <Mark />
        </Button>
    </div>

    const sideCom = <List_Side data={data} auth={auth} />;

    if (params.id) {
        const getList = data.find(list => list.id == params.id);
        const taskss = () => {
            try {
                return getList.task ?? [];
            } catch (error) {
                setTimeout(() => getList.task, 1000);
            }
        };
        // const tasks = getList.task ?? [];
        return <div className={css.lContainer}>
            {sideCom}
            <div className={container('row')}>
                {/* add new item button*/}
                {!showAdd && addbtn}

                {/* add collection input */}
                {showAdd && addComp}

                {taskss() ?
                    taskss().map(task =>
                        <List_Item
                            auth={auth}
                            id={task.id}
                            title={task.task}
                            status={task.status}
                        />)
                    : <h3>please add any task</h3>}
            </div>
        </div>

    }
    return <div className={css.lContainer}>
        {sideCom}
        <div className={container('row')} >
            <h4>Select any collection</h4>
        </div>
    </div >



}

// style={{ display: 'flex', gap: '1rem', padding: "1rem" }
{/* <MDEditor
onChange={(newValue = "") => setValue(newValue)}
textareaProps={{
    placeholder: "Please enter Markdown text"
}}
height={500}
value={value}
previewOptions={{
    components: {
        code: Code
    }
}}
/> */}

export default List;





