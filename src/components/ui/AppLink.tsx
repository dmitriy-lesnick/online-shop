import { Link, LinkProps } from "react-router-dom";
import { getRouteByName, TRoutesNames } from "../../router/libs";
import { InferRouteParams } from "./../types";

type AppLinksProp<T extends TRoutesNames> = Omit<LinkProps, 'to'> & {
    to: T
} & AddParamsToProps<InferRouteParams<T>>

function AppLink<T extends TRoutesNames>({ to, params, ...other }: AppLinksProp<T>) {

    const route = getRouteByName(to);
    let url: string = route.path;

    params?.forEach(param => {
        url = url.replace(/:.+?(\/|$)/, function (find) {
            return param + (find.endsWith('/') ? '/' : '');
        })
    });

    return <Link to={url} {...other} />
}

export default AppLink;

type AddParamsToProps<T> =
    T extends [] ?
    { params?: never } :
    { params: T }



