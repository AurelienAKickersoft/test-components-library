import styles from './Button.module.scss'
export default function Button({url, message, isDanger}){
    const dangerClass = isDanger ? styles.danger : '';
    return (<a href={url} target={"_blank"} className={`${styles.Button} ${dangerClass}`}>
        {message}
    </a>)
}

