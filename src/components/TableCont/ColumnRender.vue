<script>
export default {
    functional: true,
    props: {
        row: Object,
        render: Function
    },
    render: (h, ctx) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index
        };
        return <span>{ctx.props.render(h, params)}</span>
    }
};
</script>