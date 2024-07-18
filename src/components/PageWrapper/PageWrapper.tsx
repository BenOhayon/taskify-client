import { PageWrapperProps } from "../../types/propTypes";

export default function PageWrapper({
    page: Element,
    layout: Layout
}: PageWrapperProps) {
    return (
        <>
            {
                Layout ? <Layout><Element /></Layout> : <Element />
            }
        </>
    )
}
