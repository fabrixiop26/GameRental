using System.ComponentModel;

namespace GameRental.Helpers
{
    public class PageInfo
    {
        public bool HasPreviousPage { get; private set; }
        public bool HasNextPage { get; private set; }
        public PageInfo(bool previousPage, bool nextPage)
        {
            HasPreviousPage = previousPage;
            HasNextPage = nextPage;
        }
    }
    public class PagedResponse<T>
    {
        public T Data { get; set; }
        public PageInfo PageInfo { get; private set; }
        public PagedResponse(T _data, bool previousPage, bool nextPage)
        {
            Data = _data;
            PageInfo = new PageInfo(previousPage, nextPage);
        }
    }
}
