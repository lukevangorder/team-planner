class Event {
    constructor(id, info, name, starts_at, ends_at, user_id) {
        this.id = id;
        this.info = info;
        this.name = name;
        this.starts_at = new Date (starts_at);
        this.ends_at = new Date(ends_at);
        this.user_id = user_id;
    }

    update(id, info, name, starts_at, ends_at, user_id) {
        this.id = id;
        this.info = info;
        this.name = name;
        this.starts_at = new Date (starts_at);
        this.ends_at = new Date(ends_at);
        this.user_id = user_id;
    }

    get stringyStart() {
        let minutes = String(this.starts_at.getMinutes());
        if (minutes.length < 2) {
            return this.starts_at.getHours() + ':0' + minutes;
        } else {
            return this.starts_at.getHours() + ':' + minutes;
        }      
    }

    get stringyEnd() {
        let minutes = String(this.ends_at.getMinutes());
        if (minutes.length < 2) {
            return this.ends_at.getHours() + ':0' + minutes;
        } else {
            return this.ends_at.getHours() + ':' + minutes;
        }      
    }

    get formatEnd() {
        let minutes = String(this.ends_at.getMinutes());
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }  
        let month = String(this.ends_at.getMonth()+1);
        if (month.length < 2) {
            month = '0'+month;
        }   
        let day = String(this.ends_at.getDate());
        if (day.length < 2) {
            day = '0'+day;
        } 
        let hour = String(this.ends_at.getHours());
        if (hour.length < 2) {
            hour = '0'+hour;
        }
        return this.ends_at.getFullYear() +'-'+ month +'-'+ day +'T'+ hour +':'+ minutes
    }

    get formatStart() {
        let minutes = String(this.starts_at.getMinutes());
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }  
        let month = String(this.starts_at.getMonth()+1);
        if (month.length < 2) {
            month = '0'+month;
        }   
        let day = String(this.starts_at.getDate());
        if (day.length < 2) {
            day = '0'+day;
        } 
        let hour = String(this.starts_at.getHours());
        if (hour.length < 2) {
            hour = '0'+hour;
        }
        return this.starts_at.getFullYear() +'-'+ month +'-'+ day +'T'+ hour +':'+ minutes
    }
}