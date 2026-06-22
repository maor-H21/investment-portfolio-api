


export const dateTimeFormater_il = {
    formatDate:  (date) =>  {
        if (!date) return '';
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Intl.DateTimeFormat('he-IL', options).format(new Date(date));
    }
    ,
    formatTime:  (date) =>  {
        if (!date) return '';
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Intl.DateTimeFormat('he-IL', options).format(new Date(date));
    }
}

export const getFormattedDate = (date = new Date()) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};