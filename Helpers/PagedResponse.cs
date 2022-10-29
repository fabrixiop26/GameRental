using System.ComponentModel;

namespace GameRental.Helpers
{
    public class PagedResponse<T> : OkResponse<T>
    {
        public int Count { get; private set; }
        public PagedResponse(T _data, int count) :base(_data)
        {
            Count = count;
        }
    }
}
