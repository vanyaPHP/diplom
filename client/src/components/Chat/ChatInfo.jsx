import CompanionMessage from "../Chat/CompanionMessage";
import SelfMessage from "../Chat/SelfMessage";

export default function ChatInfo() {
    return (
        <>
            <div className="bg-slate-900 p-4 border-b  border-gray-300 text-white text-lg">
                Receiver Name
            </div>
            <div className="overflow-y-auto p-4 bg-white flex-grow">
                <CompanionMessage/>
                <SelfMessage/>
            </div>
        </>
    );
}