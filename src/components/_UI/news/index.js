function convertDate(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const shortYear = String(year).slice(-2);

  const monthAbbreviations = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const abbreviatedMonth = monthAbbreviations[month - 1];

  const formattedDate = `${abbreviatedMonth}-${day.toString().padStart(2, '0')}-${shortYear}`;

  return formattedDate;
}

const News = ({ posts, companyColor }) => {
  if (companyColor === undefined) {
    companyColor = '#299EE0';
  }

  return (
    <>
      {posts.length ? (
        posts.map((post, idx) => (
          <div key={`news-${idx}`}>
            <p className="text-[#595959] text-base leading-5">
              <span className="pr-[4px] date text-[16px]">
                {post.publishedDate ? convertDate(post.publishedDate.split(' ')[0]) : 'MAY-01-24'}
              </span>
              <span className="name text-[16px]" style={{ color: companyColor }}>
                {post.site}{' '}
              </span>
              <br />
              <a href={post.url} target="_blank" rel="noreferrer" className="text-white text-[16px]">
                {post.title}
              </a>
            </p>
          </div>
        ))
      ) : (
        <p className="text-center my-4">No news data</p>
      )}
    </>
  );
};

export default News;
