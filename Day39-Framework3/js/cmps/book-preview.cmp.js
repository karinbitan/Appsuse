export default {
    props: ['book'],

    template: `
    <li class="book-preview">
        <h3>{{book.title}}</h3>
        <img :src="book.thumbnail" height="150px" />
        <h4>{{book.listPrice.amount}}{{currencyIcon}}</h4>
    </li>
    `,

    computed: {
        currencyIcon() {
            const currency = this.book.listPrice.currencyCode;
            var icon;
            switch (currency) {
                case 'EUR':
                    icon = '€';
                    break;
                case 'ILS':
                    icon = '₪';
                    break;
                case 'USD':
                    icon = '$';
                    break;
                default:
                    icon = currency;      
            };
            return icon;
        }
    }
}