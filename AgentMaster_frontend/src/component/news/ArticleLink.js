//props로 넘겨받은 기사 제목들을 출력하는 컴포넌트
//현재는 기사 제목만 넘겨받지만, 이후 백에서 기사를 끌어오는(검색하는) 기준이
//생기면 해당 props를 추가로 넘겨받을 예정
//사유: 클릭 시 해당 기사 요약화면으로 넘어가기 구현예정

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