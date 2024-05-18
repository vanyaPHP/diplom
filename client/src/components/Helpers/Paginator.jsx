import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Paginator({pagesCount, baseLink}) {
    const inactiveLinkClass = "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
    const activeLinkClass = "flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";
    const [queryParams] = useSearchParams();
    const [links, setLinks] = useState([]);
    const [prevLink, setPrevLink] = useState('');
    const [nextLink, setNextLink] = useState('');

    useEffect(() => {
        let page = 1;
        if (queryParams.get("page")) {
            page = queryParams.get("page");
        }

        let links = [];

        for(let i = 1;i <= pagesCount;i++) {
            let href = baseLink + "?page=" + i;
            links.push(
                {
                    href: href,
                    status: (i == page) ? "active": "inactive"
                }
            );
        }

        if (pagesCount == 1) {
            setPrevLink(links[0].href);
            setNextLink(links[0].href);
        } else {
            setPrevLink(((page - 1) == 0) ? links[links.length - 1].href : links[page - 2].href);
            setNextLink(((page + 1) > links.length) ? links[0].href : links[page].href);
        }

        setLinks(links);
    }, [queryParams]);

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-base h-10">
                    <li>
                        <a href={prevLink} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Предыдущая
                        </a>
                    </li>

                    {links.map((link, index) => {
                        return link.status == "active"
                            ? <a href={link.href} aria-current="page" className={activeLinkClass}>{index + 1}</a>
                            : <a href={link.href} className={inactiveLinkClass}>{index + 1}</a>
                    })}

                    <li>
                        <a href={nextLink} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Следующая
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
}