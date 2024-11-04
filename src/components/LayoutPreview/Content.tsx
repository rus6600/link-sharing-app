import { Links } from './Links'

export const Content = () => {
    return (
        <div className="layout-preview__phone_content">
            <div className="layout-preview__phone_content_avatar skeleton"></div>
            <div className="layout-preview__phone_content_placeholder skeleton"></div>
            <div
                className={`layout-preview__phone_content_placeholder_small skeleton`}
            ></div>
            <Links></Links>
        </div>
    )
}
