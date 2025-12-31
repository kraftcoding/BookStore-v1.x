using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace BookStoreApi.Models
{
    public class Book
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public DateTime? Modified { get; set; }

        [BsonElement("Title")]
        [JsonPropertyName("Title")]
        public string Title { get; set; }

        public string? Ids { get; set; }

        public string? Category { get; set; }

        public string? Authors { get; set; }

        public string? Series { get; set; }

        public DateTime? Published { get; set; }

        public string? Publisher { get; set; }

        public string? Languages { get; set; }

        public string? Tags { get; set; }

        public string? Formats { get; set; }
    }
}
