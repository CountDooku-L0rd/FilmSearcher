export const BASE_URL = 'http://localhost:3000'

export const genreOptions:{value:string, label:string}[] = [
    {value:'allGenres', label:'Все жанры'},
    {value:'drama', label: 'Драма'},
    {value:'comedy', label: 'Комедия'},
    {value:'action', label: 'Экшен'},
    {value:'fantasy', label: 'Фэнтези'},
    {value:'thriller', label: 'Триллер'},
    {value:'horror', label: 'Хоррор'},
    {value:'melodrama', label: 'Мелодрама'},
    {value:'adventure', label: 'Приключение'},
    {value:'detective', label: 'Детектив'}
]

export const statusOptions:{value:string, label:string}[] = [
    {value:'allStatuses', label:'Все статусы'},
    {value:'watched', label:'Просмотрено'},
    {value:'inPlans', label:'В планах'},
]

export const ratingOptions:{value:string, label:string}[] = [
    {value:'anyRating', label:'Любой рейтинг'},
    {value:'1', label:'1'},
    {value:'2', label:'2'},
    {value:'3', label:'3'},
    {value:'4', label:'4'},
    {value:'5', label:'5'},
    {value:'6', label:'6'},
    {value:'7', label:'7'},
    {value:'8', label:'8'},
    {value:'9', label:'9'},
    {value:'10', label:'10'},
]