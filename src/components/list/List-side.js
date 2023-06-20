import { NavLink } from 'react-router-dom';
import css from './list.module.scss';
import { useEffect, useRef, useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { Add, Mark } from '../icons/icons';
import { addList } from '../../Store/slices/ListSlice';
import { useDispatch } from 'react-redux';

// ${css.active}
const sidecss = (n) => css[`side_${n}`];
const addcss = (n) => css[`add_${n}`];
// const data = [
//     { name: 'item1', id: 1 },
//     { name: 'item2', id: 2 },
//     { name: 'item3', id: 3 },
// ]
const List_Side = ({ auth, data, add, addhandle, sideActive, listName, ...props }) => {

    const addinputref = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            addinputref.current.focus();
        } catch (error) {

        }
    }, []);

    const createNewList = async () => {
        setshowAdd(false);
        const inputvalue = addinputref.current?.value;
        if (inputvalue.length >= 3 && inputvalue.length < 32) {
            console.log('start')
            const payload = { body: { list: inputvalue }, auth }
            dispatch(addList(payload));
        }
    }

    const [side, showside] = useState(false);
    const [showAdd, setshowAdd] = useState(false);

    const addbtn = <div key={'add_button_event'} className={sidecss('addbtn')}>
        <Button classname={sidecss('addbtn_btn')} onClick={() => setshowAdd(true)}>
            <Add /> <span>Add new <strong>list</strong></span>
        </Button>
    </div>;

    const addComp = <div key={'add_new_list'} className={sidecss('add')}>
        <Input ref={addinputref} placeholder='add new list' classname={sidecss('add_input')} />
        <Button onClick={createNewList} classname={sidecss('add_button')}>
            <Mark />
        </Button>
    </div>

    const sideToggle = (active = false) =>
        <div className={css.toggle_container}>
            <div className={`${css.sideToggle} ${active && css.sideToggle_active}`} onClick={() => showside(!side)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            {!active && <h3>{listName}</h3>}
        </div>

    const getData = () => {
        try {
            return data ?? [];
        } catch (error) {
            return [];
        }
    }
    return <>
        {sideToggle()}
        <div key={'list_side'}
            className={`
                ${css.side}
                ${side && sidecss('active')}
                ${sideActive && sidecss('active')}`
            }>

            {sideToggle(true)}


            {/* _______________________ */}
            {/* add collection */}
            {/* _______________________ */}

            {/* add collection button*/}
            {!showAdd && addbtn}

            {/* add collection input */}
            {showAdd && addComp}

            {/* _______________________ */}
            {/* lists maping */}
            {/* _______________________ */}
            {(data && data.length > 0) && data.map(d =>
                <NavLink
                    onClick={() => showside(false)}
                    key={d.id} className={({ isActive }) =>
                        isActive ? `${sidecss("link")} ${sidecss("link_active")}` : sidecss("link")} to={`/lists/${d.id}`}>
                    <div className={sidecss('link_item')}>
                        <h3>{d.name}</h3>
                    </div>
                </NavLink>)}




        </div>





    </>;
}

export default List_Side;