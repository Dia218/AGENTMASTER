const ArticleLink = (props) => {
    return (
        <>
        <div className="pb-2">
            {/**해당 제목 클릭 시 링크 넘어갈 수 있도록 Link 혹은 href 필요할 듯 */}
			<h6>*{props.title}</h6>
        </div>
        </>
    );
};

export default ArticleLink;