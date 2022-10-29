namespace GameRental.Helpers
{
    public class OkResponse<T>
    {
        public T Data { get; protected set; }
        public OkResponse(T _data)
        {
            Data = _data; 
        }
    }
}
