export const Event = {
    name: "Event",
    primaryKey: "eventId",
    properties: {
      eventId: "string",
      title: "string",
      date: {type:"date", indexed:true},
      time: {type: "int", default:0, indexed:true}
    }
  };