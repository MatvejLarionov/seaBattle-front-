import { io } from "socket.io-client"
import { serverUrl } from "../../api/serverUrl"

const socket = io(serverUrl)
export default function ConnectionPage() {
  return (
    <div>
      <form>
        <input type="text" placeholder="partner login" id="inpPartnerLogin" />
        <button onClick={(event) => {
          event.preventDefault()
          
        }}>connect</button>
      </form>
    </div>
  )
}