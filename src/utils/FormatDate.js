
export const FormatDate=(now)=>{


    let option={

        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit",
        weekday:"long",
        year:"numeric",
        month:"short",
        day:"numeric"
    };

    let timestamp=Date.parse(now);
    let date=new Date(timestamp).toLocaleDateString("fr-FR",option);

    return date.toString();


}