using System.ComponentModel;

namespace GameRental.Helpers
{
    public class PagedResponse<T>
    {
        public T Data { get; private set; }
        public int Count { get; private set; }
        public PagedResponse(T _data, int count)
        {
            Data = _data;
            Count = count;
        }
    }
}
