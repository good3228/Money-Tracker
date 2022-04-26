//  format the date
const dateFormatter = date => {
    let d = new Date(date);
    let year = new Intl.DateTimeFormat('en', { year: "numeric"}).format(d);
    let month = new Intl.DateTimeFormat('en', { month: "short"}).format(d);
    let day = new Intl.DateTimeFormat('en', { day: "2-digit"}).format(d);

    return `${month}-${day}-${year}`;
};

export default dateFormatter;