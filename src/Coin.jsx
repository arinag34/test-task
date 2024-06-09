import { useState } from 'react'

const Coin = ({ coin, showFavorites }) =>{
    const [isFavorite, setFavorite] = useState(false);

    const favoriting = () => {
        setFavorite(!isFavorite);
        showFavorites(coin, !isFavorite);
    }

    return(
        <div id="coinContainer" key={coin}>
            <div id="isFav">
                <img
                    src={isFavorite ? "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTkuNTk1IDYuMjUyTDggMUw2LjQwNSA2LjI1MkgxbDQuMzczIDMuNEwzLjc1IDE1TDggMTEuNjk1TDEyLjI1IDE1bC0xLjYyMy01LjM0OEwxNSA2LjI1MnoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==" : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTkuNTk1IDYuMjUyTDggMUw2LjQwNSA2LjI1MkgxbDQuMzczIDMuNEwzLjc1IDE1TDggMTEuNjk1TDEyLjI1IDE1bC0xLjYyMy01LjM0OEwxNSA2LjI1MnptLTcuMjQ3LjQ3SDYuNzJMOCAyLjUwN0w2LjcyIDYuNzIyem0zLjUzNyAyLjc1bC0xLjMwNyA0LjMwNXptNy43NjctMi43NUg5LjI4em0tOC43NS45aDIuMzY2TDggNS4yMTRsLjczMiAyLjQxaDIuMzY3bC0xLjkxNSAxLjQ5bC43MzEgMi40MDlMOCAxMC4wMzJsLTEuOTE1IDEuNDlsLjczMS0yLjQxbC0xLjkxNS0xLjQ5eiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PC9zdmc+"}
                    onClick={favoriting}
                />
            </div>
            <div>{coin}</div>
        </div>
    )
}

export default Coin