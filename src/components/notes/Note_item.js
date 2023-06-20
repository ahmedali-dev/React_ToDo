import { Link } from 'react-router-dom';
import { Delete, Edit } from './../icons/icons'
import style from './NoteCom.module.scss';

const css = (Class = '') => Class.length == 0 ? style[`Note`] : style[`Note_link_${Class}`]
const Note = ({ title, note, id, ...props }) => {

    return <div className={style.Note}>
        <Link key={id}>
            <div className={style.Note_link}>
                <div

                    className={css('title')}
                    aria-label={!title ? 'Title...' : ''}>{title}
                </div>
                <div
                    className={css('note')}
                    aria-label={!note ? 'Note...' : ''}>{note}
                </div>
            </div>
        </Link>
        <div
            className={css('option')}>
            <div className={css('option_item')}>
                <Edit />
            </div>
            <div className={css('option_item')}>
                <Delete />
            </div>
        </div>
    </div>
}

export default Note;